// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { lusitana } from '@/app/ui/fonts';
// import { fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';


// export default async function Page() {
// 	const revenue = await fetchRevenue();
// 	const latestInvoices = await fetchLatestInvoices();


// 	return (
// 		<main>
// 			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
// 				Dashboard
// 			</h1>
// 			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
// 				<Card title="Collected" value={totalPaidInvoices} type="collected" />
// 				<Card title="Pending" value={totalPendingInvoices} type="pending" />
// 				<Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
// 				<Card
//           title="Total Customers"
//           value={numberOfCustomers}
//           type="customers"
//         />
// 			</div>
// 			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
// 				<RevenueChart revenue={revenue} />
// 				<LatestInvoices latestInvoices={latestInvoices} />
// 			</div>
// 		</main>
// 	);
// }





import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
