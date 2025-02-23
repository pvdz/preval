# Preval test case

# dropping_the_d_func.md

> Function statements > Dropping the d func
>
> Investigate why the d() function is dropped

Source: https://www.trickster.dev/post/javascript-obfuscation-techniques-by-example/

Afterwards, check if the last example (jsfk) works now. Otherwise fix that too.

--> function statements should be treated as decls and hoisted to the 
top of their func owner scope before further treatment. spec be damned

Note: THIS_IS_DA____ used to get renamed because preval would see the ident
      already used as an implicit global, but would not consider it referencing
      the declared func statement. So it renamed the func, as it would to dedupe.

The fix was to make sure function statements got hoisted to the top of the func
scope in the pre-normalization step.

## Input

`````js filename=intro
function g() {
  $('always here');
}

function f() {
  {
    function THIS_IS_DA____() {
      $('hello');
    }
  }
  $(THIS_IS_DA____());
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let THIS_IS_DA____$1 = function () {
      debugger;
      $(`hello`);
    };
  }
  $(THIS_IS_DA____());
};
let g = function () {
  debugger;
  $(`always here`);
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let THIS_IS_DA____$1 = function () {
    debugger;
    $(`hello`);
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = THIS_IS_DA____();
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
let g = function () {
  debugger;
  $(`always here`);
  return undefined;
};
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = THIS_IS_DA____();
  $(tmpCalleeParam);
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = THIS_IS_DA____();
  $( b );
  return undefined;
};
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

THIS_IS_DA____

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
