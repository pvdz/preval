# Preval test case

# template_with_super_expression.md

> String fusing > Ai > Template with super expression
>
> Test templates with super expressions that should not be resolved statically

## Input

`````js filename=intro
class Parent {
  getValue() { return $("parent"); }
}
class Child extends Parent {
  getValue() { 
    const template = `super: ${super.getValue()}`;
    const result = template + "end";
    $(result);
  }
}
new Child().getValue();
`````


## Settled


`````js filename=intro
const Parent /*:class*/ /*truthy*/ = class {
  getValue() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(`parent`);
    return tmpReturnArg;
  }
};
const Child /*:class*/ /*truthy*/ = class extends Parent {
  getValue() {
    debugger;
    const tmpCalleeParam /*:unknown*/ = super.getValue();
    const tmpBinBothRhs$1 /*:string*/ = $coerce(tmpCalleeParam, `string`);
    const result /*:string*/ /*truthy*/ = `super: ${tmpBinBothRhs$1}end`;
    $(result);
    return undefined;
  }
};
const tmpMCOO /*:object*/ /*truthy*/ = new Child();
const tmpMCF /*:unknown*/ = tmpMCOO.getValue;
$dotCall(tmpMCF, tmpMCOO, `getValue`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const Parent = class {
  getValue() {
    const tmpReturnArg = $(`parent`);
    return tmpReturnArg;
  }
};
const Child = class extends Parent {
  getValue() {
    $(`super: ${super.getValue()}end`);
  }
};
const tmpMCOO = new Child();
tmpMCOO.getValue();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
getValue(  ) {
  debugger;
  const b = $( "parent" );
  return b;
}
};
const c = class   {
getValue(  ) {
  debugger;
  const d = super.getValue();
  const e = $coerce( d, "string" );
  const f = `super: ${e}end`;
  $( f );
  return undefined;
}
};
const g = new c();
const h = g.getValue;
$dotCall( h, g, "getValue" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let Parent = class {
  getValue() {
    debugger;
    const tmpReturnArg = $(`parent`);
    return tmpReturnArg;
  }
};
let Child = class extends Parent {
  getValue() {
    debugger;
    const tmpBinBothLhs = `super: `;
    let tmpCalleeParam = super.getValue();
    const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
    const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
    const template = $coerce(tmpBinLhs, `plustr`);
    const tmpStringConcatR = $coerce(template, `plustr`);
    const result = `${tmpStringConcatR}end`;
    $(result);
    return undefined;
  }
};
const tmpMCOO = new Child();
const tmpMCF = tmpMCOO.getValue;
$dotCall(tmpMCF, tmpMCOO, `getValue`);
`````


## Todos triggered


- (todo) Encountered non-ident as callee
- (todo) infertyping on a non-ident? is that a crash or bug? MemberExpression
- (todo) when we are still receiving method calls in typed tracked tricks?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'parent'
 - 2: 'super: parentend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
