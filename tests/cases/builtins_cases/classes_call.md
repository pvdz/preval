# Preval test case

# classes_call.md

> Builtins cases > Classes call
>
> Check if builtin toplevel classes are changed into their symbols

## Input

`````js filename=intro
$('Boolean:', Boolean());
$('Number:', Number());
$('String:', String());
$('Array:', Array());
$('Object:', Object());
$('Date:', Date().length); // Hrm, value changes every call, of course.
$('Function:', Function());
$('RegExp:', RegExp());
// Will throw without `new`
$('Map:', Map());
$('Set:', Set());
// Will throw without an arg
$('Buffer:', Buffer());
// These are not functions. Preval may brick here.
$('Math:', Math());
$('JSON:', JSON());
`````


## Settled


`````js filename=intro
$(`Boolean:`, false);
$(`Number:`, 0);
$(`String:`, ``);
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = $array_constructor();
$(`Array:`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:object*/ /*truthy*/ = $object_constructor();
$(`Object:`, tmpCalleeParam$7);
const tmpCompObj /*:date*/ /*truthy*/ = $date_constructor();
const tmpCalleeParam$9 /*:unknown*/ = tmpCompObj.length;
$(`Date:`, tmpCalleeParam$9);
const tmpCalleeParam$11 /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
$(`Function:`, tmpCalleeParam$11);
const tmpCalleeParam$13 /*:regex*/ /*truthy*/ = new $regex_constructor(`(?:)`, ``);
$(`RegExp:`, tmpCalleeParam$13);
const tmpCalleeParam$15 /*:map*/ /*truthy*/ = $map_constructor();
$(`Map:`, tmpCalleeParam$15);
const tmpCalleeParam$17 /*:set*/ /*truthy*/ = $set_constructor();
$(`Set:`, tmpCalleeParam$17);
const tmpCalleeParam$19 /*:buffer*/ /*truthy*/ = $buffer_constructor();
$(`Buffer:`, tmpCalleeParam$19);
const tmpCalleeParam$21 /*:unknown*/ = Math();
$(`Math:`, tmpCalleeParam$21);
const tmpCalleeParam$23 /*:unknown*/ = JSON();
$(`JSON:`, tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Boolean:`, false);
$(`Number:`, 0);
$(`String:`, ``);
$(`Array:`, $array_constructor());
$(`Object:`, $object_constructor());
$(`Date:`, $date_constructor().length);
$(`Function:`, function () {});
$(`RegExp:`, new $regex_constructor(`(?:)`, ``));
$(`Map:`, $map_constructor());
$(`Set:`, $set_constructor());
$(`Buffer:`, $buffer_constructor());
$(`Math:`, Math());
$(`JSON:`, JSON());
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Boolean:", false );
$( "Number:", 0 );
$( "String:", "" );
const a = $array_constructor();
$( "Array:", a );
const b = $object_constructor();
$( "Object:", b );
const c = $date_constructor();
const d = c.length;
$( "Date:", d );
const e = function() {
  debugger;
  return undefined;
};
$( "Function:", e );
const f = new $regex_constructor( "(?:)", "" );
$( "RegExp:", f );
const g = $map_constructor();
$( "Map:", g );
const h = $set_constructor();
$( "Set:", h );
const i = $buffer_constructor();
$( "Buffer:", i );
const j = Math();
$( "Math:", j );
const k = JSON();
$( "JSON:", k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = false;
$(`Boolean:`, tmpCalleeParam);
let tmpCalleeParam$1 = 0;
$(`Number:`, tmpCalleeParam$1);
let tmpCalleeParam$3 = ``;
$(`String:`, tmpCalleeParam$3);
let tmpCalleeParam$5 = $array_constructor();
$(`Array:`, tmpCalleeParam$5);
let tmpCalleeParam$7 = $object_constructor();
$(`Object:`, tmpCalleeParam$7);
const tmpCompObj = $date_constructor();
let tmpCalleeParam$9 = tmpCompObj.length;
$(`Date:`, tmpCalleeParam$9);
let tmpCalleeParam$11 = function () {
  debugger;
  return undefined;
};
$(`Function:`, tmpCalleeParam$11);
let tmpCalleeParam$13 = new $regex_constructor(`(?:)`, ``);
$(`RegExp:`, tmpCalleeParam$13);
let tmpCalleeParam$15 = $map_constructor();
$(`Map:`, tmpCalleeParam$15);
let tmpCalleeParam$17 = $set_constructor();
$(`Set:`, tmpCalleeParam$17);
let tmpCalleeParam$19 = $buffer_constructor();
$(`Buffer:`, tmpCalleeParam$19);
let tmpCalleeParam$21 = Math();
$(`Math:`, tmpCalleeParam$21);
let tmpCalleeParam$23 = JSON();
$(`JSON:`, tmpCalleeParam$23);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_constructor
- (todo) type trackeed tricks can possibly support static $buffer_constructor
- (todo) type trackeed tricks can possibly support static $date_constructor
- (todo) type trackeed tricks can possibly support static $map_constructor
- (todo) type trackeed tricks can possibly support static $object_constructor
- (todo) type trackeed tricks can possibly support static $set_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Boolean:', false
 - 2: 'Number:', 0
 - 3: 'String:', ''
 - 4: 'Array:', []
 - 5: 'Object:', {}
 - 6: 'Date:', 64
 - 7: 'Function:', '<function>'
 - 8: 'RegExp:', {}
 - eval returned: ("<crash[ Constructor Map requires 'new' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
