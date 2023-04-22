
  const postJob = async (jobDetails) => {
    await firestore.collection('jobs').add({ ...jobDetails, postedOn: app.firestore.FieldValue.serverTimestamp(), });
    console.log("THIS IS THE POST JOB FUNCTION WORKINGGGGGG");
  };
  
  const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }

    if (route.route) {
      const Component = route.component;
      return (
        <Route
          exact
          path={route.route}
          element={<Component post={route.post} />}
          key={route.key}
        />
      );
    }

              routes={[
             
                {
                  type: "collapse",
                  name: "Web3 Jobs",
                  key: "Web3 Jobs",
                  route: "/web3-jobs",
                  icon: <Office size="12px" />,
                  noCollapse: true,
                  
                },
                
              ]}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
        {getRoutes(routes.filter((route) => route.key !== "Web3 Jobs"))}
      <Route path="/web3-jobs" element={<Web3Jobs post={postJob} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    
  );
}
