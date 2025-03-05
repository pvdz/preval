# Preval test case

# yes__var_decl_is_const_nested.md

> Binding > Promote const > Yes  var decl is const nested
>
> This is a var decl that is actually a constant but the only write is nested in something else. After our normalization steps it has to be a statement.

The x should be made a constant.

## Input

`````js filename=intro
var x;
{
  $(x = $(10));
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  $((x = $(10)));
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = undefined;
x = $(10);
let tmpCalleeParam = x;
$(tmpCalleeParam);
$(x);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(10);
$(x);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
