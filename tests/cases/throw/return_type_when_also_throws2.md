# Preval test case

# return_type_when_also_throws2.md

> Throw > Return type when also throws2
>
> If a function has a uniform return type it should still be considered as such when it also throws explicitly.

The final result should not trampoline the call but outline the `1` directly.

#TODO

## Input

`````js filename=intro
const _THROW = function () {
  $('do');
  $('not');
  $('inline');
  $('please');
  // Spoiler: it will be inlined anyways :)
  if ($) return;
  throw new Error('always throws');
};

$(_THROW())
$(_THROW())
$(_THROW())
$(_THROW())
`````

## Pre Normal

`````js filename=intro
const _THROW = function () {
  debugger;
  $(`do`);
  $(`not`);
  $(`inline`);
  $(`please`);
  if ($) return;
  throw new Error(`always throws`);
};
$(_THROW());
$(_THROW());
$(_THROW());
$(_THROW());
`````

## Normalized

`````js filename=intro
const _THROW = function () {
  debugger;
  $(`do`);
  $(`not`);
  $(`inline`);
  $(`please`);
  if ($) {
    return undefined;
  } else {
    const tmpThrowArg = new Error(`always throws`);
    throw tmpThrowArg;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = _THROW();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = _THROW();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = _THROW();
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = _THROW();
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const _THROW = function () {
  debugger;
  $(`do`);
  $(`not`);
  $(`inline`);
  $(`please`);
  if ($) {
    return undefined;
  } else {
    const tmpThrowArg = new Error(`always throws`);
    throw tmpThrowArg;
  }
};
_THROW();
$(undefined);
_THROW();
$(undefined);
_THROW();
$(undefined);
_THROW();
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'do'
 - 2: 'not'
 - 3: 'inline'
 - 4: 'please'
 - 5: undefined
 - 6: 'do'
 - 7: 'not'
 - 8: 'inline'
 - 9: 'please'
 - 10: undefined
 - 11: 'do'
 - 12: 'not'
 - 13: 'inline'
 - 14: 'please'
 - 15: undefined
 - 16: 'do'
 - 17: 'not'
 - 18: 'inline'
 - 19: 'please'
 - 20: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
