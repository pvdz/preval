# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = $(1) || 2);
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
x = $(1);
if (x) {
} else {
  x = 2;
}
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let SSA_x = $(1);
if (SSA_x) {
} else {
  SSA_x = 2;
}
const tmpCalleeParam = SSA_x;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
