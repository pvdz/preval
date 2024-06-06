# Preval test case

# func_end.md

> Normalize > Sequence > Func end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
function f() {
  ($(1), $(2), $(3), $(4), ($(5), $(6)));
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(1), $(2), $(3), $(4), ($(5), $(6));
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( 5 );
$( 6 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
