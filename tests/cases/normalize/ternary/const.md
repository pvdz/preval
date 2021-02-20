# Preval test case

# const.md

> Normalize > Ternary > Const
>
> Example of rewriting a var decl with ternary as init

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
const foo = a ? b : c;
$(foo);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let foo = undefined;
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
