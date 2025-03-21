# Preval test case

# never_loops.md

> Ref tracking > Done > While-if > Never loops
>
> A loop that never loops should not be a loop
> We can fix this when our loops are while(true) and they guarantee to break at the end of every branching path

## Options

- refTest

## Input

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app"; // never observed, overwritten inside the loop
  let b = "jhayon.vercel.app"; // never observed, overwritten in both branches in the loop
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const h = b.length;
    $(h)
    c = c + 1;
    break;
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
if ($) {
  /*4*/ let a___7__ = `jhayon.vercel.app`;
  let b___12__ = `jhayon.vercel.app`;
  let c___17__ = 1;
  const d___21__ = $(`x`);
  a___33__ = d___30__.slice___31__(0);
  const e___36__ = a___38__[0];
  const f___42__ = e___44__ === `.`;
  if (f___48__) {
    /*49*/ b___57__ = a___54__.slice___55__(1);
  } /*58*/ else {
    b___62__ = a___61__;
  }
  const h___65__ = b___67__.length___68__;
  $(h___72__);
  c___78__ = c___76__ + 1;
} /*79*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | not read    | none           | 33
  - w @33      | ########## | 38,54,61    | 7              | none
  - r @38      | 33
  - r @54      | 33
  - r @61      | 33

b:
  - w @12      | ########## | not read    | none           | 57,62
  - w @57      | ########## | 67          | 12             | none
  - w @62      | ########## | 67          | 12             | none
  - r @67      | 57,62

c:
  - w @17      | ########## | 76          | none           | 78
  - r @76      | 17
  - w @78      | ########## | not read    | 17             | none

d:
  - w @21      | ########## | 30          | none           | none
  - r @30      | 21

e:
  - w @36      | ########## | 44          | none           | none
  - r @44      | 36

f:
  - w @42      | ########## | 48          | none           | none
  - r @48      | 42

h:
  - w @65      | ########## | 72          | none           | none
  - r @72      | 65
