# Preval test case

# ifelse_with_escaping_tail_closure_binding.md

> Normalize > Branching > Ifelse with escaping tail closure binding
>
> Regression found while running Preval on Tenko

The problem is that if-else normalization would slice the tail into its own function. But if the tail contained a var decl that was also used in a closure (defined before the if) then the binding would not be accessible anymore, leading to a global variable. 

In this case the function "escapes"; it is passed on into a black hole. It still needs to do what it used to.

#TODO

## Input

`````js filename=intro
const f = function () {
  const g = function () {
    $(xyz, 'g');
  };
  const t = $([g]); // <- preval won't know $ so it can't safely trace `g` from here on out
  if ($) {
    $(1);
  }
  const xyz = $();
  t[0]();
  return g();
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz, `g`);
  };
  const t = $([g]);
  if ($) {
    $(1);
  }
  const xyz = $();
  t[0]();
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz, `g`);
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [g];
  const t = tmpCallCallee(tmpCalleeParam);
  if ($) {
    $(1);
  } else {
  }
  const xyz = $();
  t[0]();
  const tmpReturnArg = g();
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const g = function () {
  debugger;
  $(xyz, `g`);
  return undefined;
};
const tmpCalleeParam = [g];
const t = $(tmpCalleeParam);
if ($) {
  $(1);
} else {
}
const xyz = $();
t[0]();
$(xyz, `g`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b, "g" );
  return undefined;
};
const c = [ a ];
const d = $( c );
if ($) {
  $( 1 );
}
const b = $();
d[ 0 ]()};
$( b, "g" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['<function>']
 - 2: 1
 - 3: 
 - 4: undefined, 'g'
 - 5: undefined, 'g'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
