    
/*
    <div className='flex justify-between items-center bg-white w-full p-5 border-5'>
      <div className="relative inline-block">
        <span
          className="px-2 py-1 bg-gray-800 text-white rounded cursor-default"
          data-tip="Search Users to chat"
        >
          <button
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            <i className="fas fa-search"></i>
            <span className="hidden md:inline-block px-4">Search User</span>
          </button>
        </span>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 bg-gray-800 text-white p-2 rounded text-center">
          Search Users to chat
        </div>
      </div>
      <h3>CHAT</h3>
      <div>
      </div>
    </div>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white w-full max-w-md mx-auto">
          <div className="border-b border-gray-200 py-2 px-4">Search Users</div>
          <div className="p-4">
            <div className="flex pb-2">
              <input
                type="text"
                placeholder="Search by name or email"
                className="mr-2 px-3 py-2 border border-gray-300 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSearch}
              >
                Go
              </button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
              <div className="ml-auto">
                <div className="animate-spin rounded-full border-4 border-blue-500 border-opacity-25 w-8 h-8"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
)
*/