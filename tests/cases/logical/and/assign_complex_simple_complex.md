# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 && $(2));
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
x = 1;
if (x) {
  x = $(2);
}
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var x;
let SSA_x = 1;
if (SSA_x) {
  SSA_x = $(2);
}
const tmpCalleeParam = SSA_x;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
