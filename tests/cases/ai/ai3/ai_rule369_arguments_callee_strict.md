# Preval test case

# ai_rule369_arguments_callee_strict.md

> Ai > Ai3 > Ai rule369 arguments callee strict
>
> Rule 369: arguments.callee in strict mode

## Options

callee doesnt even work in strict mode

- skipEval

## Input

`````js filename=intro
(function() {
  function strictFunc(a) {
    'use strict';
    try {
      let callee = arguments.callee;
      $('callee_accessed', typeof callee);
    } catch (e) {
      $('callee_error', e.name, e.message.includes('callee'));
    }
  }
  strictFunc($('arg1', 1));

  function nonStrictWrapper() {
    // This outer function is strict due to module mode
    // but let's see if an inner non-strict declaration changes anything
    // for Preval's view if it were to not enforce module strictness everywhere.
    // However, current understanding is Preval IS module-strict throughout.
    function innerNonStrict() {
      // This would be strict anyway because the whole file is a module.
      try {
        let callee = arguments.callee;
        $('inner_callee_accessed', typeof callee);
      } catch (e) {
        $('inner_callee_error', e.name, e.message.includes('callee'));
      }
    }
    innerNonStrict($('arg2', 2));
  }
  nonStrictWrapper();
})();
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`arg1`, 1);
const tmpPrevalAliasArgumentsAny$1 /*:array*/ /*truthy*/ = [a];
try {
  const callee /*:unknown*/ = tmpPrevalAliasArgumentsAny$1.callee;
  const tmpCalleeParam$7 /*:string*/ /*truthy*/ = typeof callee;
  $(`callee_accessed`, tmpCalleeParam$7);
} catch (e) {
  const tmpCalleeParam$9 /*:unknown*/ = e.name;
  const tmpMCOO$1 /*:unknown*/ = e.message;
  const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.includes;
  const tmpCalleeParam$11 /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `includes`, `callee`);
  $(`callee_error`, tmpCalleeParam$9, tmpCalleeParam$11);
}
const innerNonStrict /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  try {
    const callee$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny.callee;
    const tmpCalleeParam /*:string*/ /*truthy*/ = typeof callee$1;
    $(`inner_callee_accessed`, tmpCalleeParam);
  } catch (e$1) {
    const tmpCalleeParam$1 /*:unknown*/ = e$1.name;
    const tmpMCOO /*:unknown*/ = e$1.message;
    const tmpMCF /*:unknown*/ = tmpMCOO.includes;
    const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `includes`, `callee`);
    $(`inner_callee_error`, tmpCalleeParam$1, tmpCalleeParam$3);
  }
  return undefined;
};
const tmpCalleeParam$5 /*:unknown*/ = $(`arg2`, 2);
innerNonStrict(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`arg1`, 1);
const tmpPrevalAliasArgumentsAny$1 = [a];
try {
  const callee = tmpPrevalAliasArgumentsAny$1.callee;
  $(`callee_accessed`, typeof callee);
} catch (e) {
  const tmpCalleeParam$9 = e.name;
  const tmpMCOO$1 = e.message;
  $(`callee_error`, tmpCalleeParam$9, tmpMCOO$1.includes(`callee`));
}
const innerNonStrict = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  try {
    const callee$1 = tmpPrevalAliasArgumentsAny.callee;
    $(`inner_callee_accessed`, typeof callee$1);
  } catch (e$1) {
    const tmpCalleeParam$1 = e$1.name;
    const tmpMCOO = e$1.message;
    $(`inner_callee_error`, tmpCalleeParam$1, tmpMCOO.includes(`callee`));
  }
};
innerNonStrict($(`arg2`, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "arg1", 1 );
const b = [ a ];
try {
  const c = b.callee;
  const d = typeof c;
  $( "callee_accessed", d );
}
catch (e) {
  const f = e.name;
  const g = e.message;
  const h = g.includes;
  const i = $dotCall( h, g, "includes", "callee" );
  $( "callee_error", f, i );
}
const j = function() {
  const k = l;
  debugger;
  try {
    const m = k.callee;
    const n = typeof m;
    $( "inner_callee_accessed", n );
  }
  catch (o) {
    const p = o.name;
    const q = o.message;
    const r = q.includes;
    const s = $dotCall( r, q, "includes", "callee" );
    $( "inner_callee_error", p, s );
  }
  return undefined;
};
const t = $( "arg2", 2 );
j( t );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let nonStrictWrapper = function () {
    debugger;
    let innerNonStrict = function () {
      const tmpPrevalAliasArgumentsAny = arguments;
      debugger;
      try {
        let callee$1 = tmpPrevalAliasArgumentsAny.callee;
        let tmpCalleeParam = typeof callee$1;
        $(`inner_callee_accessed`, tmpCalleeParam);
      } catch (e$1) {
        let tmpCalleeParam$1 = e$1.name;
        const tmpMCOO = e$1.message;
        const tmpMCF = tmpMCOO.includes;
        let tmpCalleeParam$3 = $dotCall(tmpMCF, tmpMCOO, `includes`, `callee`);
        $(`inner_callee_error`, tmpCalleeParam$1, tmpCalleeParam$3);
      }
      return undefined;
    };
    const tmpCallCallee = innerNonStrict;
    let tmpCalleeParam$5 = $(`arg2`, 2);
    innerNonStrict(tmpCalleeParam$5);
    return undefined;
  };
  let strictFunc = function ($$0) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    let a = $$0;
    debugger;
    try {
      let callee = tmpPrevalAliasArgumentsAny$1.callee;
      let tmpCalleeParam$7 = typeof callee;
      $(`callee_accessed`, tmpCalleeParam$7);
    } catch (e) {
      let tmpCalleeParam$9 = e.name;
      const tmpMCOO$1 = e.message;
      const tmpMCF$1 = tmpMCOO$1.includes;
      let tmpCalleeParam$11 = $dotCall(tmpMCF$1, tmpMCOO$1, `includes`, `callee`);
      $(`callee_error`, tmpCalleeParam$9, tmpCalleeParam$11);
    }
    return undefined;
  };
  const tmpCallCallee$1 = strictFunc;
  let tmpCalleeParam$13 = $(`arg1`, 1);
  strictFunc(tmpCalleeParam$13);
  nonStrictWrapper();
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) can try-escaping support this expr node type? MemberExpression
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
