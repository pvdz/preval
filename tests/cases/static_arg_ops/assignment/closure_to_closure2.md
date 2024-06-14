# Preval test case

# closure_to_closure2.md

> Static arg ops > Assignment > Closure to closure2
>
> 

#TODO

## Input

`````js filename=intro
const a = $(); let b = 2; function f() { b = a; $(a); $(b); }; f(); f(); $(a, b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  b = a;
  $(a);
  $(b);
};
const a = $();
let b = 2;
f();
f();
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  b = a;
  $(a);
  $(b);
  return undefined;
};
const a = $();
let b = 2;
f();
f();
$(a, b);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  $(a);
  $(tmpSSA_b);
  return undefined;
};
const a = $();
let tmpSSA_b = a;
f();
tmpSSA_b = a;
f();
$(a, tmpSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b );
  $( c );
  return undefined;
};
const b = $();
let c = b;
a();
c = b;
a();
$( b, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
