# Preval test case

# auto_ident_upd_pi_simple_rt.md

> Tofix > auto ident upd pi simple rt

Why does preval not know a is a number here (at the time of writing)?

## Options

- refTest

## Input

`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpClusterSSA_b$2 /*:number*/ = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  a = tmpClusterSSA_b$2;
  if (a) {
  } else {
    break;
  }
}
$(a, tmpClusterSSA_b$2);
`````


## Output

(Annotated with pids)

`````filename=intro
let a___5__ = undefined___6__;
let tmpClusterSSA_b$2___8__ = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___11__) {
  /*12*/ $(100);
  tmpClusterSSA_b$2___22__ = tmpClusterSSA_b$2___20__ + 1;
  a___26__ = tmpClusterSSA_b$2___25__;
  if (a___28__) {
    /*29*/
  } /*30*/ else {
    break;
  }
}
$(a___35__, tmpClusterSSA_b$2___36__);
`````


## Todos triggered


None


## Ref tracking result


                      | reads      | read by     | overWrites     | overwritten by
a:
  - w @5       | ########## | not read    | none           | 26
  - w @26      | ########## | 28,35       | 5,26           | 26
  - r @28      | 26
  - r @35      | 26

tmpClusterSSA_b$2:
  - w @8              | ########## | 20          | none           | 22
  - r @20             | 8,22
  - w @22             | ########## | 20,25,36    | 8,22           | 22
  - r @25             | 22
  - r @36             | 22
