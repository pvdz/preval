# Preval test case

# assign_ident.md

> Try > Noop > Assign ident
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f(x) {
  let y = 100;
  try {
    y = x;
  } catch {}
  return y;
}
$(f(50));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = 100;
  try {
    y = x;
  } catch (e) {}
  return y;
};
$(f(50));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = 100;
  try {
    y = x;
  } catch (e) {}
  return y;
};
const tmpCalleeParam = f(50);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(50);
`````

## PST Output

With rename=true

`````js filename=intro
$( 50 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
