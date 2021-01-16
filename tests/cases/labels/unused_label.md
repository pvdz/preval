# Preval test case

# unused_label.md

> labels > unused_label
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: $(1);
`````

## Normalized

`````js filename=intro
{
  $(1);
}
`````

## Output

`````js filename=intro
$(1);
`````
