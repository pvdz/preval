# Preval test case

# complex_args.md

> Normalize > New > Complex args
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

## Input

`````js filename=intro
$(new Array(5 + 5, $(), Array.prototype.length));
`````

## Pre Normal


`````js filename=intro
$(new Array(5 + 5, $(), Array.prototype.length));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpNewCallee = Array;
const tmpCalleeParam$1 = 10;
const tmpCalleeParam$3 = $();
const tmpCompObj = $Array_prototype;
const tmpCalleeParam$5 = tmpCompObj.length;
const tmpCalleeParam = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $();
const tmpCalleeParam /*:array*/ = [10, tmpCalleeParam$3, 0];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = [ 10, a, 0 ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: [10, undefined, 0]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
