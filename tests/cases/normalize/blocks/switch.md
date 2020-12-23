# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): $(3);
  case $(4):
  case $(5):
  case $(6): break;
  case $(7):
  default:
}
`````

## Normalized

`````js filename=intro
switch ($(1)) {
  case $(2): {
    $(3);
  }
  case $(4):

  case $(5):

  case $(6): {
    break;
  }
  case $(7):

  default:
}
`````

## Output

`````js filename=intro
switch ($(1)) {
  case $(2): {
    $(3);
  }
  case $(4):

  case $(5):

  case $(6): {
    break;
  }
  case $(7):

  default:
}
`````
