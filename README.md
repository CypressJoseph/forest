# forest

head for cy-node

## synopsis

we want to:
- view test runs and spec file status across a project
- trigger suite and spec runs
- permit deep interactions with system layer (network, filesystem -- maths, db?)

## ideas

- i like the idea of a `forest` cli command could wrap around cy-node, fire a request to the server to trigger a run of the specs; launch app windows etc (bonus: replacing `jest` with `forest` means only a 3 letter diff to get started)