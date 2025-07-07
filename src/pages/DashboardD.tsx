import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Button } from "../components/ui/button";
import CountUp from "react-countup";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardD() {
  const [showBanner, setShowBanner] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllStudents, setShowAllStudents] = useState(false);

  const projects = [
    { name: "Decentralized Student Funding", funded: "100XLM", required: "200XLM", status: "In Progress" },
    { name: "Life care waters", funded: "40XLM", required: "400XLM", status: "Complete" },
    { name: "FinanCAl", funded: "60XLM", required: "800XLM", status: "Not started" },
    { name: "KilimoTek", funded: "100XLM", required: "100XLM", status: "In Progress" },
    { name: "AgriConnect", funded: "20XLM", required: "200XLM", status: "Not started" },
  ];

  const students = [
    { name: "Tiffany Wangui", funded: 20, required: 50 },
    { name: "Emilia Njoki", funded: 70, required: 70 },
    { name: "James Brian", funded: 40, required: 30 },
    { name: "Kevin Otieno", funded: 10, required: 60 },
    { name: "Jane Njeri", funded: 90, required: 100 },
    { name: "John Mwangi", funded: 60, required: 60 },
    { name: "Faith Chebet", funded: 50, required: 90 },
    { name: "Lilian Ouma", funded: 100, required: 100 },
  ];

  const donationData = [
    { month: "JAN", amount: 50 },
    { month: "FEB", amount: 100 },
    { month: "MAR", amount: 200 },
    { month: "APR", amount: 400 },
    { month: "MAY", amount: 200 },
    { month: "JUN", amount: 100 },
    { month: "JUL", amount: 500 },
  ];

  return (
    <PageWrapper>
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Banner */}
        {showBanner && (
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <p className="text-sm dark:text-gray-300">
                  Welcome back! Your{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    donation wallet
                  </span>{" "}
                  is active.
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => setShowBanner(false)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 text-center py-4 rounded shadow">
              <p className="text-2xl font-bold text-green-700">
                <CountUp start={0} end={368} duration={2} separator="," />
              </p>
              <p className="text-gray-600 text-sm">Students funded</p>
            </div>
            <div className="bg-blue-100 text-center py-4 rounded shadow">
              <p className="text-2xl font-bold text-blue-700">
                <CountUp start={0} end={500} duration={2} suffix="XLM" separator="," />
              </p>
              <p className="text-gray-600 text-sm">Total in donations</p>
            </div>
            <div className="bg-purple-100 text-center py-4 rounded shadow">
              <p className="text-2xl font-bold text-purple-700">
                <CountUp start={0} end={54} duration={2} separator="," />
              </p>
              <p className="text-gray-600 text-sm">Projects funded</p>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto mb-8">
            <h2 className="text-lg font-semibold px-4 pt-4 pb-2">Previously funded projects</h2>
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-4 py-2">Project name</th>
                  <th className="px-4 py-2">Amount funded</th>
                  <th className="px-4 py-2">Amount required</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {(showAllProjects ? projects : projects.slice(0, 4)).map((project, idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="px-4 py-2">{project.name}</td>
                    <td className="px-4 py-2">{project.funded}</td>
                    <td className="px-4 py-2">{project.required}</td>
                    <td className="px-4 py-2">{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {projects.length > 4 && (
              <div className="flex justify-end p-4">
                <Button onClick={() => setShowAllProjects(!showAllProjects)}>
                  {showAllProjects ? "Show Less" : "View All"}
                </Button>
              </div>
            )}
          </div>

          {/* Students Table */}
          <div className="bg-white dark:bg-gray-800 rounded shadow p-6 mb-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Previously Funded Students</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-blue-100 dark:bg-blue-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Amount Funded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Amount Required
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900">
                 {(showAllStudents ? students : students.slice(0, 4)).map((student, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-green-600 dark:text-green-400">{student.funded}XLM</td>
                    <td
                   className={`px-6 py-4 text-sm ${
                      student.funded < student.required
                   ? "text-red-600 dark:text-red-400"
                   : "text-gray-800 dark:text-gray-200"
                }`}
      >
        {student.required}XLM
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            {students.length > 4 && (
              <div className="flex justify-end mt-4">
                <Button onClick={() => setShowAllStudents(!showAllStudents)}>
                  {showAllStudents ? "Show Less" : "View All"}
                </Button>
              </div>
            )}
          </div>

          {/* Donations Chart */}
          <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Donations Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={donationData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value}XLM`} />
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
