# Preval test case

# string_with_class_expression.md

> String fusing > Ai > String with class expression
>
> Test string concatenation with class expressions

## Input

`````js filename=intro
const MyClass = class {
  constructor() {
    this.name = $("class");
  }
};
const instance = new MyClass();
const result = "class: " + instance.name;
$(result);
`````


## Settled


`````js filename=intro
const MyClass /*:class*/ /*truthy*/ = class {
  constructor() {
    const tmpPrevalAliasThis /*:unknown*/ = this;
    debugger;
    const tmpAssignMemRhs /*:unknown*/ = $(`class`);
    tmpPrevalAliasThis.name = tmpAssignMemRhs;
    return undefined;
  }
};
const instance /*:object*/ /*truthy*/ = new MyClass();
const tmpBinBothRhs /*:unknown*/ = instance.name;
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const result /*:string*/ /*truthy*/ = `class: ${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const MyClass = class {
  constructor() {
    const tmpPrevalAliasThis = this;
    tmpPrevalAliasThis.name = $(`class`);
  }
};
const tmpStringConcatL = new MyClass().name + ``;
$(`class: ${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
constructor(  ) {
  const b = this;
  debugger;
  const c = $( "class" );
  b.name = c;
  return undefined;
}
};
const d = new a();
const e = d.name;
const f = $coerce( e, "plustr" );
const g = `class: ${f}`;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const MyClass = class {
  constructor() {
    const tmpPrevalAliasThis = this;
    debugger;
    const tmpAssignMemLhsObj = tmpPrevalAliasThis;
    const tmpAssignMemRhs = $(`class`);
    tmpAssignMemLhsObj.name = tmpAssignMemRhs;
    return undefined;
  }
};
const instance = new MyClass();
const tmpBinBothLhs = `class: `;
const tmpBinBothRhs = instance.name;
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'class'
 - 2: 'class: class'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
