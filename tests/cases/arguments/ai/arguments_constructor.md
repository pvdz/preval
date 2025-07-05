# Preval test case

# arguments_constructor.md

> Arguments > Ai > Arguments constructor
>
> Test arguments in class constructor

## Input

`````js filename=intro
class TestConstructor {
  constructor() {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
  }
}
new TestConstructor('constructor_arg');
`````


## Settled


`````js filename=intro
const TestConstructor /*:class*/ /*truthy*/ = class {
  constructor() {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
    const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
    debugger;
    const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
    $(tmpPrevalAliasArgumentsLen, first);
    return undefined;
  }
};
new TestConstructor(`constructor_arg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const TestConstructor = class {
  constructor() {
    const tmpPrevalAliasArgumentsAny = arguments;
    $(arguments.length, tmpPrevalAliasArgumentsAny[0]);
  }
};
new TestConstructor(`constructor_arg`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
constructor(  ) {
  const b = c;
  const d = c.length;
  debugger;
  const e = b[ 0 ];
  $( d, e );
  return undefined;
}
};
new a( "constructor_arg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let TestConstructor = class {
  constructor() {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return undefined;
  }
};
new TestConstructor(`constructor_arg`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'constructor_arg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
