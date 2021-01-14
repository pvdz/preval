# Preval test case

# label_break.md

> labels > label_break
>
> This is a pseudo-switch

#TODO

## Input

`````js filename=intro
foo: break foo;
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
`````

## Uniformed

`````js filename=intro
x: {
  break x;
}
`````

## Output

`````js filename=intro
foo: {
  break foo;
}
`````
