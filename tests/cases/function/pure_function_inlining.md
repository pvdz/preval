# Preval test case

# pure_function_inlining.md

> Function > Pure function inlining
>
> We have a pure function that is called with two different strings. Can it detect the inlining?

Ultimately, this is the core of what Preval should be able to do.

This actually starts like this;

```js
function rule(desc) {
  $(PURPLE + 'Rule:' + RESET + ' "' + desc + '"');
}
```

Which folds up more obviously to the eye. But the test case is the normalized version of it.

Ideally, the result is something like this. How we get there, I currently don't know yet.

```js
$('purpleRulereset: "I want it my way"');
$('purpleRulereset: "You have to listen to me"');
```

It should see and respect the bindings to be constant which makes certain transforms easier to do.

The function could either be copied and explicitly extrapolated for that given input.

This makes sense for pure functions but less so when there are complicated arbitrary expressions in the function that we can't eliminate because we may end up with more code rather than less, which is counter productive.

## Input

`````js filename=intro
const PURPLE = 'purple';
const RESET = 'reset';

function rule(desc) {
  const func = $;
  const a = PURPLE + 'Rule:';
  const b = a + RESET;
  const c = b + ' "';
  const d = c + desc;
  const e = d + '"';
  func(e);
}

rule('I want it my way');
rule('You have to listen to me');
`````

## Settled


`````js filename=intro
$(`purpleRule:reset "I want it my way"`);
$(`purpleRule:reset "You have to listen to me"`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`purpleRule:reset "I want it my way"`);
$(`purpleRule:reset "You have to listen to me"`);
`````

## Pre Normal


`````js filename=intro
let rule = function ($$0) {
  let desc = $$0;
  debugger;
  const func = $;
  const a = PURPLE + `Rule:`;
  const b = a + RESET;
  const c = b + ` "`;
  const d = c + desc;
  const e = d + `"`;
  func(e);
};
const PURPLE = `purple`;
const RESET = `reset`;
rule(`I want it my way`);
rule(`You have to listen to me`);
`````

## Normalized


`````js filename=intro
let rule = function ($$0) {
  let desc = $$0;
  debugger;
  const func = $;
  const tmpStringConcatR = $coerce(PURPLE, `plustr`);
  const a = `${tmpStringConcatR}Rule:`;
  const b = a + RESET;
  const tmpStringConcatR$1 = $coerce(b, `plustr`);
  const c = `${tmpStringConcatR$1} "`;
  const d = c + desc;
  const tmpStringConcatR$3 = $coerce(d, `plustr`);
  const e = `${tmpStringConcatR$3}"`;
  func(e);
  return undefined;
};
const PURPLE = `purple`;
const RESET = `reset`;
rule(`I want it my way`);
rule(`You have to listen to me`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "purpleRule:reset \"I want it my way\"" );
$( "purpleRule:reset \"You have to listen to me\"" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'purpleRule:reset "I want it my way"'
 - 2: 'purpleRule:reset "You have to listen to me"'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
