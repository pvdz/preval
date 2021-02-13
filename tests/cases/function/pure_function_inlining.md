# Preval test case

# pure_function_inlining.md

> function > pure_function_inlining
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

#TODO

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

## Normalized

`````js filename=intro
function rule(desc) {
  const func = $;
  const a = PURPLE + 'Rule:';
  const b = a + RESET;
  const c = b + ' "';
  const d = c + desc;
  const e = d + '"';
  func(e);
}
const PURPLE = 'purple';
const RESET = 'reset';
rule('I want it my way');
rule('You have to listen to me');
`````

## Output

`````js filename=intro
function rule(desc) {
  const a = 'purple' + 'Rule:';
  const b = a + 'reset';
  const c = b + ' "';
  const d = c + desc;
  const e = d + '"';
  $(e);
}
rule('I want it my way');
rule('You have to listen to me');
`````

## Result

Should call `$` with:
 - 1: 'purpleRule:reset "I want it my way"'
 - 2: 'purpleRule:reset "You have to listen to me"'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same