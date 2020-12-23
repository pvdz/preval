# Preval test case

# if_new.md

> ifelse > harder > if_new
>
> The `new` operator is guaranteed to return an object which is always truthy

## Input

`````js filename=intro
if (new ($(1))) $(2);
`````

## Normalized

`````js filename=intro
if (new ($(1))()) {
  $(2);
}
`````

## Output

`````js filename=intro
{
  new ($(1))();
  {
    $(2);
  }
}
`````
