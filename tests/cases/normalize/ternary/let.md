# Preval test case

# var.md

> normalize > ternary > var
>
> Example of rewriting a var decl with ternary as init

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let foo = a ? b : c;
$(foo);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  let foo;
  if (a) {
    foo = b;
  } else {
    foo = c;
  }
}
$(foo);
`````

## Output

`````js filename=intro
let foo;
foo = 2;
$(foo);
`````
