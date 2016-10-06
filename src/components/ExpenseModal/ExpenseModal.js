import React from "react";
import {LowerScreenModal} from "components/Modal";
import PersonMoneyList from "components/PersonMoneyList";
import Avatar from "components/Avatar";
import Amount from "components/Amount"

import styles from "./ExpenseModal.scss";
import FontIcon from "react-toolbox/lib/font_icon";

export const ExpenseModal = (props) => {

  const onClose = props.onClose || (() => { });
  const active = props.active || false;
  const expense = props.expense;

  const name = expense.name;
  const debtee = expense.debtee;
  const persons = expense.debtors;

  return (
    <LowerScreenModal header={name} active={active} onClose={onClose}>
      <PersonMoneyList persons={persons} showKeyword={false}/>
      <div className={styles.debtee}>
        <span className={styles.avatar}><Avatar name={debtee.name} size={30}/></span>
        <span className={styles.name}>{debtee.name} <b>paid</b></span>
        <Amount value={debtee.amount} theme={ {span: styles.total} } />
        <div style={{clear: "both"}}></div>
      </div>
      <div className={styles.added}>
        <FontIcon className={styles.serverIcon} value="cloud_done"/>
        <span className={styles.serverDate}>added 2016-05-06</span>
        <FontIcon className={styles.addedIcon} value="access_time"/>
        <span className={styles.addedDate}>paid 2016-05-06</span>
        <div style={{clear: "both"}}></div>
      </div>
    </LowerScreenModal>);

};

ExpenseModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  expense: React.PropTypes.object.isRequired,
};

export default ExpenseModal
