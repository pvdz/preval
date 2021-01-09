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
  break;
}
`````

## Normalized

`````js filename=intro
switch ($(1)) {
  default: {
    {
      $(3);
    }
    break;
  }
}
`````

## Uniformed

`````js filename=intro
switch (x(8)) {
  default: {
    {
      x(8);
    }
    break;
  }
}
`````

## Output

`````js filename=intro
switch ($(1)) {
  default: {
    $(3);
    break;
  }
}
`````
