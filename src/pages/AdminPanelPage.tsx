import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LogOut, Download, RefreshCw, Mail, Phone, Building2, Globe, FileText, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import type { CoorganizerApplication } from '../hooks/useCoorganizerApplication';

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">GDC25 Co-organizer Applications</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

function ApplicationsTable({ applications }: { applications: CoorganizerApplication[] }) {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    waitlisted: 'bg-blue-100 text-blue-800',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatOrgType = (types: string[]) => {
    return types.map(t => t.toUpperCase()).join(', ');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organization
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submitted
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{app.organization_name}</div>
                    {app.website && (
                      <a
                        href={app.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary-600 hover:underline flex items-center gap-1"
                      >
                        <Globe className="w-3 h-3" />
                        {app.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="space-y-1">
                  <a
                    href={`mailto:${app.contact_email}`}
                    className="text-sm text-gray-900 hover:text-secondary-600 flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    {app.contact_email}
                  </a>
                  {app.contact_phone && (
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {app.contact_phone}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-gray-900">{formatOrgType(app.organization_type)}</span>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                  {app.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(app.created_at)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationDetail({ application }: { application: CoorganizerApplication }) {
  return (
    <div className="bg-gray-50 px-4 py-4 border-t border-gray-200">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Strategic Contribution
          </h4>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{application.strategic_contribution}</p>
        </div>
        {application.additional_info && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Information</h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{application.additional_info}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ onSignOut }: { onSignOut: () => Promise<void> }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: applications, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['coorganizer-applications-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coorganizer_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as CoorganizerApplication[];
    },
    staleTime: 60 * 1000, // 1 minute
  });

  const exportToCSV = () => {
    if (!applications || applications.length === 0) return;

    const headers = [
      'Organization Name',
      'Website',
      'Contact Email',
      'Contact Phone',
      'Organization Type',
      'Strategic Contribution',
      'Additional Info',
      'Status',
      'Submitted At',
    ];

    const rows = applications.map(app => [
      app.organization_name,
      app.website || '',
      app.contact_email,
      app.contact_phone || '',
      app.organization_type.join('; '),
      `"${app.strategic_contribution.replace(/"/g, '""')}"`,
      app.additional_info ? `"${app.additional_info.replace(/"/g, '""')}"` : '',
      app.status,
      new Date(app.created_at).toISOString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coorganizer-applications-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">Co-organizer Applications</p>
          </div>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Applications
                {applications && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({applications.length} total)
                  </span>
                )}
              </h2>
              <button
                onClick={() => refetch()}
                disabled={isRefetching}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <button
              onClick={exportToCSV}
              disabled={!applications || applications.length === 0}
              className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {isLoading ? (
            <div className="px-4 py-12 text-center text-gray-500">
              Loading applications...
            </div>
          ) : error ? (
            <div className="px-4 py-12 text-center">
              <div className="text-red-600 mb-2">Failed to load applications</div>
              <p className="text-sm text-gray-500">{error instanceof Error ? error.message : 'Unknown error'}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 text-secondary-600 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : applications && applications.length === 0 ? (
            <div className="px-4 py-12 text-center text-gray-500">
              No applications yet
            </div>
          ) : applications ? (
            <div>
              <ApplicationsTable applications={applications} />
              {applications.map(app => (
                <div key={app.id}>
                  <button
                    onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                    className="w-full px-4 py-2 text-left text-sm text-secondary-600 hover:bg-gray-50 border-t border-gray-100"
                  >
                    {expandedId === app.id ? 'Hide details' : 'Show details'} for {app.organization_name}
                  </button>
                  {expandedId === app.id && <ApplicationDetail application={app} />}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default function AdminPanelPage() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={signIn} />;
  }

  return <Dashboard onSignOut={signOut} />;
}
