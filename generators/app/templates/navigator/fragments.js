module.exports = {
  routesImportTemplate: '<%- key %>Route,',

  tabBarItemTemplate: `
          <TabBarIOS.Item
            selected={selectedTab === '<%- key %>'}
            title={'<%- title %>'}
            onPress={() => this.changeTab('<%- key %>')}
            badge={theme.fontFamily}
          >
            <Navigator initialRoute={<%- key %>Route} />
          </TabBarIOS.Item>
  `,

  routesImportContainersTemplate: {
    details: `
import <%- upperKey %>Details from '../modules/generated/containers/<%- upperKey %>/Details';`,
    category: `
import <%- upperKey %>Category from '../modules/generated/containers/<%- upperKey %>/Category';`,
    index: `
import <%- upperKey %> from '../modules/generated/containers/<%- upperKey %>';`,
  },

  routesTemplate: {
    details: `
export const <%- key %>DetailsRoute = {
  component: <%- upperKey %>Details,
  title: 'Details',
};`,
    category: `
export const <%- key %>CategoryRoute = {
  component: <%- upperKey %>Category,
  title: 'Category',
};`,
    index: `
export const <%- key %>Route = {
  component: <%- upperKey %>,
  title: '<%- title %>',
};`,
  },
};
