# Preval test case

# complex_args_and_callee.md

> Normalize > New > Complex args and callee
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

## Input

`````js filename=intro
$(new ($())(5 + 5, $(), Array.prototype.length));
`````

## Pre Normal


`````js filename=intro
$(new ($())(5 + 5, $(), Array.prototype.length));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpNewCallee = $();
const tmpCalleeParam$1 = 10;
const tmpCalleeParam$3 = $();
const tmpCompObj = $ArrayPrototype;
const tmpCalleeParam$5 = tmpCompObj.length;
const tmpCalleeParam = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpNewCallee = $();
const tmpCalleeParam$3 = $();
const tmpCalleeParam$5 = $ArrayPrototype.length;
const tmpCalleeParam /*:object*/ = new tmpNewCallee(10, tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = $();
const c = $ArrayPrototype.length;
const d = new a( 10, b, c );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
