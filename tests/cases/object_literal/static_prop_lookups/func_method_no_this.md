# Preval test case

# func_method_no_this.md

> Object literal > Static prop lookups > Func method no this
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const f = function(){ $('piss'); $('pass'); $('poss'); };
const o = {f};
$(o.f());
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
};
const o = { f: f };
$(o.f());
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
  return undefined;
};
const o = { f: f };
const tmpCallCallee = $;
const tmpCalleeParam = o.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
  return undefined;
};
const o = { f: f };
const tmpCalleeParam = o.f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "piss" );
  $( "pass" );
  $( "poss" );
  return undefined;
};
const b = { f: a };
const c = b.f();
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'piss'
 - 2: 'pass'
 - 3: 'poss'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
