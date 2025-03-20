# Preval test case

# return_type_when_also_throws2.md

> Throw > Return type when also throws2
>
> If a function has a uniform return type it should still be considered as such when it also throws explicitly.

The final result should not trampoline the call but outline the `1` directly.

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


## Settled


`````js filename=intro
const _THROW /*:()=>unknown*/ = function () {
  debugger;
  $(`do`);
  $(`not`);
  $(`inline`);
  $(`please`);
  if ($) {
    return undefined;
  } else {
    const tmpThrowArg /*:object*/ = new Error(`always throws`);
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
const _THROW = function () {
  $(`do`);
  $(`not`);
  $(`inline`);
  $(`please`);
  if (!$) {
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


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "do" );
  $( "not" );
  $( "inline" );
  $( "please" );
  if ($) {
    return undefined;
  }
  else {
    const b = new Error( "always throws" );
    throw b;
  }
};
a();
$( undefined );
a();
$( undefined );
a();
$( undefined );
a();
$( undefined );
`````


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
