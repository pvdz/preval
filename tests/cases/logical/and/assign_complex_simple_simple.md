# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 && 2);
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
x = 1;
if (x) {
  x = 2;
}
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var x;
x = 1;
if (x) {
  x = 2;
}
const tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
