# Preval test case

# always_throws.md

> Throw > Always throws
>
> What should we do with a function that is guaranteed to throw?

I think the call sites should throw unconditionally as well. So the result should have a single throw and the rest is DCE'd.

## Input

`````js filename=intro
const _THROW = function () {
  $('do');
  $('not');
  $('inline');
  $('please');
  // Spoiler: it will be inlined anyways :)
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
  const tmpThrowArg = new Error(`always throws`);
  throw tmpThrowArg;
};
const tmpCalleeParam = _THROW();
$(tmpCalleeParam);
const tmpCalleeParam$1 = _THROW();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = _THROW();
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = _THROW();
$(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
$(`do`);
$(`not`);
$(`inline`);
$(`please`);
const tmpThrowArg /*:object*/ = new Error(`always throws`);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
$( "do" );
$( "not" );
$( "inline" );
$( "please" );
const a = new Error( "always throws" );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'do'
 - 2: 'not'
 - 3: 'inline'
 - 4: 'please'
 - eval returned: ('<crash[ always throws ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
