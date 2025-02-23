# Preval test case

# base.md

> If test merging > Base
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
if (bool) {
  $(true);
} else {
  $(false);
}
`````

## Pre Normal


`````js filename=intro
const bool = Boolean($(true));
if (bool) {
  $(true);
} else {
  $(false);
}
`````

## Normalized


`````js filename=intro
const tmpCallCallee = Boolean;
const tmpCalleeParam = $(true);
const bool = tmpCallCallee(tmpCalleeParam);
if (bool) {
  $(true);
} else {
  $(false);
}
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = Boolean(tmpCalleeParam);
$(tmpBool);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
