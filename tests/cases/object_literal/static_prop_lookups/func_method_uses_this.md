# Preval test case

# func_method_uses_this.md

> Object literal > Static prop lookups > Func method uses this
>
> If we can statically resolve a property lookup, we should

#TODO

## Input

`````js filename=intro
const f = function(){ 
  $('piss'); 
  $('pass'); 
  $('poss');
  // This means we can't call `f` without the context.
  // At some point we'll be able to infer the context and eliminate it anyways.
  return this.foo;
};
const o = {
  f,
  foo: 'You got it!', // We'll get it, eventually
};
$(o.f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
  return tmpPrevalAliasThis.foo;
};
const o = { f: f, foo: `You got it!` };
$(o.f());
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
  const tmpReturnArg = tmpPrevalAliasThis.foo;
  return tmpReturnArg;
};
const o = { f: f, foo: `You got it!` };
const tmpCallCallee = $;
const tmpCalleeParam = o.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
  const tmpReturnArg = tmpPrevalAliasThis.foo;
  return tmpReturnArg;
};
const o = { f: f, foo: `You got it!` };
const tmpCalleeParam = o.f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  $( "piss" );
  $( "pass" );
  $( "poss" );
  const c = b.foo;
  return c;
},;
const d = {
f: a,
foo: "You got it!"
;
const e = d.f();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'piss'
 - 2: 'pass'
 - 3: 'poss'
 - 4: 'You got it!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
