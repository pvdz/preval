# Preval test case

# if_new.md

> Ifelse > Harder > If new
>
> The `new` operator is guaranteed to return an object which is always truthy

## Input

`````js filename=intro
if (new ($($))) $(2);
`````

## Pre Normal


`````js filename=intro
if (new ($($))()) $(2);
`````

## Normalized


`````js filename=intro
const tmpNewCallee = $($);
const tmpIfTest = new tmpNewCallee();
if (tmpIfTest) {
  $(2);
} else {
}
`````

## Output


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
new tmpNewCallee();
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
new a();
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
