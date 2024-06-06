export default function Home() {
  return (
    <div>
      <p className="text-3xl text-bold text-center pt-5 pb-4">Welcome back, Admin</p>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p class="font-normal text-gray-700 dark:text-gray-400">Sales</p>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$1000.00</h5>
          </a>
        </div>
        <div>
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p class="font-normal text-gray-700 dark:text-gray-400">Customer</p>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">+100</h5>
          </a>
        </div>
        <div>
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p class="font-normal text-gray-700 dark:text-gray-400">Order</p>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">+200</h5>
          </a>
        </div>
        <div>
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p class="font-normal text-gray-700 dark:text-gray-400">Profits</p>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$9,000.00</h5>
          </a>
        </div>
      </div>
    </div>
  );
}
