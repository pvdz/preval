# Preval test case

# inv.md

> If test merging > Inv
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
if (bool) {
  $(false);
} else {
  $(true);
}
`````

## Pre Normal


`````js filename=intro
const bool = Boolean($(true));
if (bool) {
  $(false);
} else {
  $(true);
}
`````

## Normalized


`````js filename=intro
const tmpCallCallee = Boolean;
const tmpCalleeParam = $(true);
const bool = tmpCallCallee(tmpCalleeParam);
if (bool) {
  $(false);
} else {
  $(true);
}
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(true);
const tmpBool = !tmpCalleeParam;
$(tmpBool);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = !a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
