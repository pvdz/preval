# Preval test case

# var.md

> Normalize > Ternary > Var
>
> Example of rewriting a var decl with ternary as init

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
var foo = a ? b : c;
$(foo);
`````

## Normalized

`````js filename=intro
var foo;
let a = 1;
let b = 2;
let c = 3;
if (a) {
  foo = b;
} else {
  foo = c;
}
$(foo);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
