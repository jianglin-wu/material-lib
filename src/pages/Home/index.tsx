import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-sky-500 to-purple-500 py-20 md:py-48">
      <div className="backdrop-blur-sm bg-white/20 w-auto mx-6 md:w-[600px] md:mx-auto rounded-[20px] shadow-xl p-4 space-y-2">
        <Disclosure defaultOpen>
          {({ open }) => (
            <div>
              <div className="mx-auto w-full rounded-2xl">
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Todo</span>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
              </div>
              <div className="mx-auto w-full p-2">
                <Disclosure.Panel className="text-white">
                  This is TODO list example,{' '}
                  <Link
                    to="/todo"
                    className="text-cyan-200 hover:text-cyan-100 hover:underline"
                  >
                    to Todo page
                  </Link>
                  .
                </Disclosure.Panel>
              </div>
            </div>
          )}
        </Disclosure>
        <Disclosure defaultOpen>
          {({ open }) => (
            <div>
              <div className="mx-auto w-full rounded-2xl">
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Form</span>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
              </div>
              <div className="mx-auto w-full p-2">
                <Disclosure.Panel className="text-white">
                  <div>
                    This is advance form, use to search filter,{' '}
                    <Link
                      to="/form/list-filter-head"
                      className="text-cyan-200 hover:text-cyan-100 hover:underline"
                    >
                      to Form page.
                    </Link>
                  </div>
                  <div>
                    This is advance form, use to search filter,{' '}
                    <Link
                      to="/form/dynamic-filter"
                      className="text-cyan-200 hover:text-cyan-100 hover:underline"
                    >
                      to Form Dynamic Filter page.
                    </Link>
                  </div>
                </Disclosure.Panel>
              </div>
            </div>
          )}
        </Disclosure>
        <Disclosure defaultOpen>
          {({ open }) => (
            <div>
              <div className="mx-auto w-full rounded-2xl">
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Workspace</span>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
              </div>
              <div className="mx-auto w-full p-2">
                <Disclosure.Panel className="text-white">
                  This is Drop board, can drop and resize,{' '}
                  <Link
                    to="/Workspace"
                    className="text-cyan-200 hover:text-cyan-100 hover:underline"
                  >
                    to Workspace Page
                  </Link>
                  .
                </Disclosure.Panel>
              </div>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default Home;
