export const objectRepository = {
  homepage: {
    title: {
      selector: 'title',
      description: 'The title of the Playwright homepage',
    },
    header: {
      selector: 'header',
      description: 'The main header of the homepage',
    },
  },
  loginPage: {
    usernameField: {
      selector: '#username',
      description: 'The username input field on the login page',
    },
    passwordField: {
      selector: '#password',
      description: 'The password input field on the login page',
    },
    loginButton: {
      selector: 'button[type="submit"]',
      description: 'The login button on the login page',
    },
  },
};

export function getLocator(page: string, element: string) {
  if (objectRepository[page] && objectRepository[page][element]) {
    return objectRepository[page][element].selector;
  }
  throw new Error(`Locator for ${element} on ${page} not found in the object repository.`);
}
