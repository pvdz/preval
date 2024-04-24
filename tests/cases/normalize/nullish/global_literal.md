# Preval test case

# global_literal.md

> Normalize > Nullish > Global literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$(parseInt??length);
`````

## Pre Normal

`````js filename=intro
$(parseInt ?? length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = parseInt;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = parseInt;
const tmpIfTest = parseInt == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
  $(tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = parseInt;
const b = parseInt == null;
if (b) {
  a = length;
  $( a );
}
else {
  $( a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

length

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
