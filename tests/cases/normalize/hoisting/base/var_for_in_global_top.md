# Preval test case

# global_block.md

> normalize > hoisting > global_block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
for (var x in {y: 100}) $(x, 'for');
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
const tmpForInRhs = { y: 100 };
for (x in tmpForInRhs) {
  $(x, 'for');
}
$(x);
`````

## Output

`````js filename=intro
var x;
$(x);
const tmpForInRhs = { y: 100 };
for (x in tmpForInRhs) {
  $(x, 'for');
}
$(x);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same