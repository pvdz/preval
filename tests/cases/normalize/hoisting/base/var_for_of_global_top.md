# Preval test case

# var_for_of_global_top.md

> Normalize > Hoisting > Base > Var for of global top
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
for (var x of [100]) $(x, 'for');
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
const tmpForOfRhs = [100];
for (x of tmpForOfRhs) {
  $(x, 'for');
}
$(x);
`````

## Output

`````js filename=intro
var x;
$(x);
const tmpForOfRhs = [100];
for (x of tmpForOfRhs) {
  $(x, 'for');
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
