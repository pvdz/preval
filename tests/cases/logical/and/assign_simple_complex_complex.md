# Preval test case

# assign_simple_complex_complex.md

> Logical > And > Assign simple complex complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = $(1) && $(2));
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$((x = $(1) && $(2)));
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpCallCallee = $;
x = $(1);
if (x) {
  x = $(2);
} else {
}
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
  x = $(2);
} else {
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
