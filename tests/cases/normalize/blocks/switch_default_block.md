# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  default: {
    $(3);
  }
}
`````

## Normalized

`````js filename=intro
switch ($(1)) {
  default: {
    $(3);
  }
}
`````

## Uniformed

`````js filename=intro
switch (x(8)) {
  default: {
    x(8);
  }
}
`````

## Output

`````js filename=intro
switch ($(1)) {
  default: {
    $(3);
  }
}
`````
