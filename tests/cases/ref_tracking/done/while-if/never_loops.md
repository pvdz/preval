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
  /*4*/ let a___13__ = `jhayon.vercel.app`;
  let b___17__ = `jhayon.vercel.app`;
  let c___21__ = 1;
  const d___24__ = $(`x`);
  a___36__ = d___33__.slice___34__(0);
  const e___38__ = a___40__[0];
  const f___43__ = e___45__ === `.`;
  if (f___49__) {
    /*50*/ b___58__ = a___55__.slice___56__(1);
  } /*59*/ else {
    b___63__ = a___62__;
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
  - w @13      | ########## | not read    | none           | 36
  - w @36      | ########## | 40,55,62    | 13             | none
  - r @40      | 36
  - r @55      | 36
  - r @62      | 36

b:
  - w @17      | ########## | not read    | none           | 58,63
  - w @58      | ########## | 67          | 17             | none
  - w @63      | ########## | 67          | 17             | none
  - r @67      | 58,63

c:
  - w @21      | ########## | 76          | none           | 78
  - r @76      | 21
  - w @78      | ########## | not read    | 21             | none

d:
  - w @24      | ########## | 33          | none           | none
  - r @33      | 24

e:
  - w @38      | ########## | 45          | none           | none
  - r @45      | 38

f:
  - w @43      | ########## | 49          | none           | none
  - r @49      | 43

h:
  - w @65      | ########## | 72          | none           | none
  - r @72      | 65
