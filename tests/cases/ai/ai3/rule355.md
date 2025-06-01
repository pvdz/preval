# Preval test case

# rule355.md

> Ai > Ai3 > Rule355
>
> Rule 355: Chained assignment involving a setter

## Input

`````js filename=intro
//
// Rationale:
// Rule 354 showed a problem with chained assignments (getter on RHS) where the
// actual assignment part seemed to be missing in the Preval output, even though
// the RHS was evaluated. This rule explores a similar scenario but with a setter
// as the intermediate part of a chained assignment.
// We want to verify:
// 1. The setter is correctly invoked.
// 2. The value assigned to the leftmost variable (`x`) is the value from the
//    original RHS (`$('input_val', 10)`), not the (ignored) return value of
//    the setter itself.
// 3. Side effects within the setter are preserved.
//
// According to ECMAScript spec (e.g., 13.15.2 Assignment Operators Runtime Semantics):
// The expression `lref = rval` evaluates to `rval`.
// So, `x = obj.y = $('input_val')` is equivalent to `x = (obj.y = $('input_val'))`.
// The sub-expression `(obj.y = $('input_val'))` will invoke the setter for `obj.y`
// with `$('input_val')`, and this sub-expression itself will evaluate to `$('input_val')`.
// This value is then assigned to `x`.

(function() {
  let x;
  let obj = {
    _val: undefined, // Start with undefined to see it change
    set y(v) {
      $('setter_called', v);
      this._val = v * 2; // Side effect
      // return v + 1; // A setter's return value is ignored in assignment
    }
  };
  x = obj.y = $('input_val', 10);
  $('final_x', x);
  $('final_obj_val', obj._val);
})();
`````


## Settled


`````js filename=intro
const tmpNestedPropAssignRhs /*:unknown*/ = $(`input_val`, 10);
const obj /*:object*/ = {
  _val: undefined,
  set y($$0) {
    const tmpPrevalAliasThis /*:object*/ = this;
    const v /*:unknown*/ = $$0;
    debugger;
    $(`setter_called`, v);
    const tmpAssignMemRhs /*:number*/ = v * 2;
    tmpPrevalAliasThis._val = tmpAssignMemRhs;
    return undefined;
  },
};
obj.y = tmpNestedPropAssignRhs;
$(`final_x`, tmpNestedPropAssignRhs);
const tmpCalleeParam /*:unknown*/ = obj._val;
$(`final_obj_val`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedPropAssignRhs = $(`input_val`, 10);
const obj = {
  _val: undefined,
  set y(v) {
    const tmpPrevalAliasThis = this;
    $(`setter_called`, v);
    tmpPrevalAliasThis._val = v * 2;
  },
};
obj.y = tmpNestedPropAssignRhs;
$(`final_x`, tmpNestedPropAssignRhs);
$(`final_obj_val`, obj._val);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input_val", 10 );
const b = {
  _val: undefined,
  set y( $$0 ) {
    const c = this;
    const d = $$0;
    debugger;
    $( "setter_called", d );
    const e = d * 2;
    c._val = e;
    return undefined;
  },
};
b.y = a;
$( "final_x", a );
const f = b._val;
$( "final_obj_val", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let x = undefined;
  let obj = {
    _val: undefined,
    set y($$0) {
      const tmpPrevalAliasThis = this;
      let v = $$0;
      debugger;
      $(`setter_called`, v);
      const tmpAssignMemLhsObj = tmpPrevalAliasThis;
      const tmpAssignMemRhs = v * 2;
      tmpAssignMemLhsObj._val = tmpAssignMemRhs;
      return undefined;
    },
  };
  const tmpNestedAssignPropRhs = $(`input_val`, 10);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  obj.y = tmpNestedPropAssignRhs;
  x = tmpNestedPropAssignRhs;
  $(`final_x`, tmpNestedPropAssignRhs);
  let tmpCalleeParam = obj._val;
  $(`final_obj_val`, tmpCalleeParam);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input_val', 10
 - 2: 'setter_called', 'input_val'
 - 3: 'final_x', 'input_val'
 - 4: 'final_obj_val', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
